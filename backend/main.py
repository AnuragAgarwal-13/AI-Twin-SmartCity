from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from backend.database import SessionLocal
from backend import crud
from backend.schemas import SmartCityDataSchema


app = FastAPI()


# ============================================================
# CORS
# ============================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5175",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5175",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================================
# DATABASE DEPENDENCY
# ============================================================

def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


# ============================================================
# ROOT
# ============================================================

@app.get("/")
def root():
    return {
        "message": "AI Twin Smart City API is running",
        "city": "Bengaluru",
        "status": "online",
    }


# ============================================================
# DASHBOARD
# ============================================================

@app.get("/summary")
def dashboard_summary(
    db: Session = Depends(get_db)
):
    return crud.get_dashboard_summary(db)


@app.get("/dashboard")
def dashboard(
    db: Session = Depends(get_db)
):
    return crud.get_dashboard_summary(db)


# ============================================================
# COMMON RECORD APIs
# ============================================================

@app.get(
    "/records",
    response_model=list[SmartCityDataSchema]
)
def get_all_records(
    db: Session = Depends(get_db)
):
    return crud.get_all_records(db)


@app.get(
    "/records/{record_id}",
    response_model=SmartCityDataSchema
)
def get_record(
    record_id: int,
    db: Session = Depends(get_db)
):
    record = crud.get_record_by_id(db, record_id)

    if not record:
        raise HTTPException(
            status_code=404,
            detail="Record not found"
        )

    return record


# ============================================================
# TRAFFIC
# ============================================================

@app.get(
    "/traffic",
    response_model=list[SmartCityDataSchema]
)
def get_traffic(
    db: Session = Depends(get_db)
):
    return crud.get_all_traffic(db)


# IMPORTANT:
# Keep /traffic/filter BEFORE /traffic/{record_id}

@app.get("/traffic/filter")
def traffic_filter(
    road_id: str | None = None,
    weather: str | None = None,
    density: str | None = None,
    db: Session = Depends(get_db)
):
    return crud.filter_traffic(
        db,
        road_id,
        weather,
        density
    )


@app.get(
    "/traffic/{record_id}",
    response_model=SmartCityDataSchema
)
def get_traffic_record(
    record_id: int,
    db: Session = Depends(get_db)
):

    record = crud.get_traffic_by_id(
        db,
        record_id
    )

    if not record:
        raise HTTPException(
            status_code=404,
            detail="Traffic record not found"
        )

    return record


# ============================================================
# WEATHER
# ============================================================

@app.get("/weather/summary")
def weather_summary(
    db: Session = Depends(get_db)
):
    return crud.get_weather_summary(db)


@app.get("/weather/filter")
def weather_filter(
    weather: str | None = None,
    temperature: str | None = None,
    humidity: str | None = None,
    db: Session = Depends(get_db)
):
    return crud.filter_weather(
        db,
        weather,
        temperature,
        humidity
    )


# ============================================================
# AIR QUALITY
# ============================================================

@app.get("/air-quality/summary")
def air_quality_summary(
    db: Session = Depends(get_db)
):
    return crud.get_air_quality_summary(db)


@app.get("/air-quality/filter")
def air_quality_filter(
    category: str | None = None,
    status: str | None = None,
    db: Session = Depends(get_db)
):
    return crud.filter_air_quality(
        db,
        category,
        status
    )


@app.get("/air-quality/categories")
def air_quality_categories(
    db: Session = Depends(get_db)
):
    return crud.get_aqi_category_statistics(db)


# ============================================================
# WATER
# ============================================================

@app.get("/water/summary")
def water_summary(
    db: Session = Depends(get_db)
):
    return crud.get_water_summary(db)


@app.get("/water/leakages")
def water_leakages(
    db: Session = Depends(get_db)
):
    return crud.get_water_leakages(db)


@app.get("/water/supply")
def water_supply(
    db: Session = Depends(get_db)
):
    return crud.get_water_supply_statistics(db)


# ============================================================
# ENERGY
# ============================================================

@app.get("/energy/summary")
def energy_summary(
    db: Session = Depends(get_db)
):
    return crud.get_energy_summary(db)


@app.get("/energy/sources")
def energy_sources(
    db: Session = Depends(get_db)
):
    return crud.get_energy_source_statistics(db)


@app.get("/energy/outages")
def energy_outages(
    db: Session = Depends(get_db)
):
    return crud.get_power_outage_records(db)


# ============================================================
# CRIME & PUBLIC SAFETY
# ============================================================

@app.get("/crime/summary")
def crime_summary(
    db: Session = Depends(get_db)
):
    return crud.get_crime_summary(db)


@app.get("/crime/types")
def crime_types(
    db: Session = Depends(get_db)
):
    return crud.get_crime_type_statistics(db)


@app.get("/crime/severity")
def crime_severity(
    db: Session = Depends(get_db)
):
    return crud.get_crime_severity_statistics(db)


@app.get("/crime/hotspots")
def crime_hotspots(
    db: Session = Depends(get_db)
):
    return crud.get_crime_hotspots(db)


# ============================================================
# ZONES
# ============================================================

@app.get("/zones")
def zone_statistics(
    db: Session = Depends(get_db)
):
    return crud.get_zone_statistics(db)