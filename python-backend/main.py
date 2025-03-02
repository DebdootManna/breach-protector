from fastapi import FastAPI, HTTPException, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import List, Optional, Dict, Any
import os
import json
import time
from datetime import datetime
import uuid

# Import our modules
from breach_checker import check_hibp_breaches, scan_dark_web
from removal_engine import send_removal_request, get_removal_status

app = FastAPI(title="Breach Protector API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Rate limiting middleware
@app.middleware("http")
async def rate_limit_middleware(request: Request, call_next):
    # Simple rate limiting - in production use Redis or similar
    client_ip = request.client.host
    current_time = time.time()
    
    # Allow 10 requests per minute per IP
    # In a real implementation, use a proper rate limiting solution
    
    response = await call_next(request)
    return response

# Models
class ScanRequest(BaseModel):
    email: EmailStr
    include_dark_web: bool = True
    include_data_brokers: bool = True

class RemovalRequest(BaseModel):
    broker_ids: List[str]
    user_data: Dict[str, Any]

class StatusRequest(BaseModel):
    request_id: str

# Routes
@app.get("/")
async def root():
    return {"message": "Breach Protector API is running"}

@app.post("/scan")
async def scan_for_breaches(request: ScanRequest):
    try:
        # Check Have I Been Pwned
        hibp_breaches = await check_hibp_breaches(request.email)
        
        results = {
            "breaches": hibp_breaches,
            "scan_id": str(uuid.uuid4()),
            "scan_date": datetime.now().isoformat(),
        }
        
        # Add dark web results if requested
        if request.include_dark_web:
            dark_web_results = await scan_dark_web(request.email)
            results["dark_web"] = dark_web_results
        
        # Add data broker results if requested
        if request.include_data_brokers:
            # In a real implementation, this would check actual data broker databases
            results["data_brokers"] = [
                {"id": "1", "name": "Acxiom", "has_data": True},
                {"id": "2", "name": "Experian", "has_data": True},
                {"id": "3", "name": "Spokeo", "has_data": False}
            ]
        
        return results
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error scanning for breaches: {str(e)}")

@app.post("/remove")
async def request_data_removal(request: RemovalRequest):
    try:
        # Validate request
        if not request.broker_ids:
            raise HTTPException(status_code=400, detail="At least one broker ID is required")
        
        if not request.user_data.get("email"):
            raise HTTPException(status_code=400, detail="User email is required")
        
        # Process removal requests
        results = []
        for broker_id in request.broker_ids:
            result = await send_removal_request(broker_id, request.user_data)
            results.append(result)
        
        return {
            "request_id": str(uuid.uuid4()),
            "request_date": datetime.now().isoformat(),
            "results": results
        }
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing removal request: {str(e)}")

@app.get("/status/{request_id}")
async def check_removal_status(request_id: str):
    try:
        # Get status of removal request
        status = await get_removal_status(request_id)
        return status
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error checking removal status: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)