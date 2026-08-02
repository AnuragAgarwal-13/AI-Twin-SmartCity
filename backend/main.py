from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware

from backend.database import SessionLocal
from backend import crud
from backend.schemas import TransportationDataSchema

app = FastAPI(title="AI Twin Smart City API")

# -----------------------------
# CORS
# -----------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# -----------------------------
# Database Dependency
# -----------------------------
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# -----------------------------
# Home API
# -----------------------------
@app.get("/")
def home():
    return {
        "message": "AI Twin Smart City Backend is Running!"
    }


# -----------------------------
# Summary API
# -----------------------------
@app.get("/summary")
def summary():
    db = SessionLocal()

    total = crud.get_total_records(db)

    db.close()

    return {
        "total_records": total
    }


# -----------------------------
# Dashboard API
# -----------------------------
@app.get("/dashboard")
def dashboard(db: Session = Depends(get_db)):
    return crud.get_dashboard_summary(db)


# ======================================================
# TRAFFIC APIs
# ======================================================

# Get All Traffic Records
@app.get("/traffic", response_model=list[TransportationDataSchema])
def get_all_traffic(db: Session = Depends(get_db)):
    return crud.get_all_traffic(db)


# Search Traffic by Road ID
@app.get("/traffic/search/{road_id}", response_model=list[TransportationDataSchema])
def search_traffic(
    road_id: str,
    db: Session = Depends(get_db)
):
    return crud.get_traffic_by_road(db, road_id)


# ======================================================
# NEW COMBINED FILTER API
# ======================================================
@app.get(
    "/traffic/filter",
    response_model=list[TransportationDataSchema]
)
def filter_traffic(
    road_id: str = None,
    weather: str = None,
    density: str = None,
    db: Session = Depends(get_db)
):
    return crud.filter_traffic(
        db=db,
        road_id=road_id,
        weather=weather,
        density=density
    )
# Get Traffic Record by ID
@app.get("/traffic/{record_id}", response_model=TransportationDataSchema)
def get_traffic(
    record_id: int,
    db: Session = Depends(get_db)
):
    record = crud.get_traffic_by_id(db, record_id)

    if record is None:
        raise HTTPException(
            status_code=404,
            detail="Record not found"
        )

    return record


# Weather Filter
@app.get("/traffic/weather/{weather}")
def get_traffic_weather(
    weather: str,
    db: Session = Depends(get_db)
):
    return crud.get_traffic_by_weather(db, weather)


# Density Filter
@app.get("/traffic/density/{density}")
def get_density(
    density: str,
    db: Session = Depends(get_db)
):
    return crud.get_traffic_by_density(db, density)




# ======================================================
# ANALYTICS APIs
# ======================================================

@app.get("/analytics/weather")
def weather_statistics(
    db: Session = Depends(get_db)
):
    return crud.get_weather_statistics(db)


@app.get("/analytics/vehicle")
def vehicle_statistics(
    db: Session = Depends(get_db)
):
    return crud.get_vehicle_statistics(db)


@app.get("/analytics/road-condition")
def road_condition_statistics(
    db: Session = Depends(get_db)
):
    return crud.get_road_condition_stats(db)


@app.get("/analytics/accident")
def accident_statistics(
    db: Session = Depends(get_db)
):
    return crud.get_accident_stats(db)


@app.get("/analytics/speed/weather")
def average_speed_weather(
    db: Session = Depends(get_db)
):
    return crud.get_average_speed_by_weather(db)


@app.get("/analytics/road")
def vehicle_count_by_road(
    db: Session = Depends(get_db)
):
    return crud.get_vehicle_count_by_road(db)


@app.get("/analytics/high-risk")
def high_risk_roads(
    db: Session = Depends(get_db)
):
    return crud.get_high_risk_roads(db)
# ======================================================
# WEATHER MODULE
# ======================================================

# -----------------------------
# Weather Summary
# -----------------------------
@app.get("/weather/summary")
def weather_summary(db: Session = Depends(get_db)):
    return crud.get_weather_summary(db)


# -----------------------------
# Weather Filter
# -----------------------------
@app.get("/weather/filter", response_model=list[TransportationDataSchema])
def weather_filter(
    weather: str = None,
    temperature: str = None,
    humidity: str = None,
    db: Session = Depends(get_db)
):
    return crud.filter_weather(
        db,
        weather,
        temperature,
        humidity
    )
