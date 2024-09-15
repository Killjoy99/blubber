from typing import Annotated

from fastapi import APIRouter, Form, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates

from .schemas import Group

templates = Jinja2Templates(directory="../static/templates")
main_router = APIRouter()

groups = []


@main_router.get("/", response_class=HTMLResponse)
async def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


@main_router.get("/matching", response_class=HTMLResponse)
async def matching(request: Request, username: str):
    return templates.TemplateResponse(
        "matching.html", {"request": request, "username": username}
    )


# Get groups
@main_router.get("/groups", response_class=HTMLResponse)
async def get_groups(request: Request):
    return templates.TemplateResponse(
        "groups.html", context={"request": request, "groups": groups}
    )


# Create a new group
@main_router.post("/groups", response_class=HTMLResponse)
async def create_group(group: Annotated[Group, Form()]):
    groups.append({"id": len(groups) + 1, "name": group.name})
    return {"success": True}


@main_router.get("/groupchat", response_class=HTMLResponse)
async def groupchat(request: Request, group_id: int):
    return templates.TemplateResponse(
        "groupchat.html", {"request": request, "group_id": group_id}
    )
