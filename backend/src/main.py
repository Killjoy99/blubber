import json

from core.routers import main_router
from core.utils import STATIC_DIR
from database.core import get_db
from fastapi import Depends, WebSocket, WebSocketDisconnect
from fastapi.staticfiles import StaticFiles
from fastapi_offline import FastAPIOffline
from matching.matching import ConnectionManager
from sqlalchemy.orm import Session

app = FastAPIOffline()

app.include_router(main_router)

manager = ConnectionManager()


@app.websocket("/ws/{username}")
async def websocket_endpoint(
    websocket: WebSocket, username: str, db: Session = Depends(get_db)
):
    # Connect the user
    await manager.connect(websocket, username, db)

    try:
        while True:
            data = await websocket.receive_text()
            # This assumes that the client sends messages in JSON format
            message = json.loads(data)

            if message["type"] == "join_group":
                group_name = message["group_name"]
                await manager.join_group(username, group_name, db)
            elif message["type"] == "leave_group":
                group_name = message["group_name"]
                await manager.leave_group(username, group_name, db)
            elif message["type"] == "message_to_group":
                group_name = message["group_name"]
                await manager.send_message_to_group(message["message"], group_name)
    except WebSocketDisconnect:
        # Handle disconnect
        manager.disconnect(username, db)


# Mount static files
app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")
