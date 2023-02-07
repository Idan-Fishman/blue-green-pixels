import pytest
from httpx import AsyncClient

from main import app


@pytest.mark.asyncio
async def test_root():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        response = await ac.get("/")
    assert response.status_code == 200
    assert response.json() == {"color": "blue", "light_hexa": "#2684FC", "dark_hexa": "#0066DA"}
