import pytest
from httpx import AsyncClient

from main import app


@pytest.mark.asyncio
async def test_root():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        response = await ac.get("/")
    assert response.status_code == 200
    assert response.json() == {"color": "green", "light_hexa": "#00AC47", "dark_hexa": "#00832D"}
