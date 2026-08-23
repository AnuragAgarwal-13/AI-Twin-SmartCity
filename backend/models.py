from sqlalchemy import Column, Integer, Float, String
from backend.database import Base


class SmartCityData(Base):

    __tablename__ = "smart_city_data"
    __table_args__ = {"schema": "public"}

    # ==========================
    # COMMON
    # ==========================

    Record_ID = Column(Integer, primary_key=True, index=True)
    Timestamp = Column(String)
    Latitude = Column(Float)
    Longitude = Column(Float)
    Zone = Column(String)
    City = Column(String)
    Day = Column(Integer)
    Month = Column(Integer)
    Year = Column(Integer)
    Hour = Column(Integer)

    # ==========================
    # TRAFFIC
    # ==========================

    Road_ID = Column(String)
    Vehicle_Count = Column(Integer)
    Avg_Speed = Column(Integer)
    Vehicle_Type = Column(String)
    Traffic_Density = Column(String)
    Road_Condition = Column(String)
    Traffic_Signal_Status = Column(String)
    Congestion_Level = Column(String)

    # ==========================
    # WEATHER
    # ==========================

    Weather = Column(String)
    Temperature = Column(Float)
    Humidity = Column(Float)
    Visibility = Column(Integer)
    Wind_Speed = Column(Float)
    Rainfall = Column(Float)

    # ==========================
    # AIR QUALITY
    # ==========================

    AQI = Column(Integer)
    AQI_Category = Column(String)

    PM25 = Column("PM2.5", Float)

    PM10 = Column(Float)
    CO = Column(Float)
    NO2 = Column(Float)
    SO2 = Column(Float)
    O3 = Column(Float)
    Air_Quality_Status = Column(String)

    # ==========================
    # WATER
    # ==========================

    Water_Level = Column(Float)
    Water_Consumption = Column(Float)
    Water_Pressure = Column(Float)
    Leakage = Column(String)
    Water_Quality = Column(Integer)
    Supply_Status = Column(String)
    Reservoir_Level = Column(Float)
    Pipeline_Status = Column(String)

    # ==========================
    # ENERGY
    # ==========================

    Energy_Consumption = Column(Integer)
    Renewable_Energy = Column(Integer)
    Peak_Load = Column(Integer)
    Voltage = Column(Float)
    Power_Factor = Column(Float)
    Energy_Source = Column(String)
    Power_Outage = Column(String)
    Grid_Status = Column(String)

    # ==========================
    # CRIME & PUBLIC SAFETY
    # ==========================

    Crime_Type = Column(String)
    Crime_Severity = Column(String)
    Crime_Status = Column(String)
    Emergency_Alert = Column(String)
    Police_Response_Time = Column(Integer)
    Police_Station = Column(String)
    CCTV_Status = Column(String)
    Crime_Hotspot = Column(String)
    Emergency_Service = Column(String)
    Incident_Count = Column(Integer)