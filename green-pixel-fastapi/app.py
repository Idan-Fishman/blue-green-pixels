from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_color():
    return {"color": "green", "light_hexa": "#00AC47", "dark_hexa": "#00832D"}