from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_color():
    return {"color": "blue", "light_hexa": "#2684FC", "dark_hexa": "#0066DA"}