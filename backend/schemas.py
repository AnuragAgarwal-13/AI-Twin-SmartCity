from pydantic import BaseModel


class SmartCityDataSchema(BaseModel):

    # ==========================
    # COMMON
    # ==========================

    Record_ID: int
    Timestamp: str
    Latitude: float
    Longitude: float
    Zone: str
    City: str
    Day: int
    Month: int
    Year: int
    Hour: int

    # ==========================
    # TRAFFIC
    # ==========================

    Road_ID: str
    Vehicle_Count: int
    Avg_Speed: int
    Vehicle_Type: str
    Traffic_Density: str
    Road_Condition: str
    Traffic_Signal_Status: str
    Congestion_Level: str

    # ==========================
    # WEATHER
    # ==========================

    Weather: str
    Temperature: float
    Humidity: float
    Visibility: int
    Wind_Speed: float
    Rainfall: float

    # ==========================
    # AIR QUALITY
    # ==========================

    AQI: int
    AQI_Category: str
    PM25: float
    PM10: float
    CO: float
    NO2: float
    SO2: float
    O3: float
    Air_Quality_Status: str

    # ==========================
    # WATER
    # ==========================

    Water_Level: float
    Water_Consumption: float
    Water_Pressure: float
    Leakage: str
    Water_Quality: int
    Supply_Status: str
    Reservoir_Level: float
    Pipeline_Status: str

    # ==========================
    # ENERGY
    # ==========================

    Energy_Consumption: int
    Renewable_Energy: int
    Peak_Load: int
    Voltage: float
    Power_Factor: float
    Energy_Source: str
    Power_Outage: str
    Grid_Status: str

    # ==========================
    # CRIME & PUBLIC SAFETY
    # ==========================

    Crime_Type: str
    Crime_Severity: str
    Crime_Status: str
    Emergency_Alert: str
    Police_Response_Time: int
    Police_Station: str
    CCTV_Status: str
    Crime_Hotspot: str
    Emergency_Service: str
    Incident_Count: int

    class Config:
        from_attributes = True