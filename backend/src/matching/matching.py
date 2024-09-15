from core.models import Group, User
from fastapi import WebSocket
from sqlalchemy.orm import Session


class ConnectionManager:
    def __init__(self):
        self.active_connections: dict = {}  # username -> websocket
        self.group_connections: dict = {}  # group_name -> list of websockets

    async def connect(self, websocket: WebSocket, username: str, db: Session):
        await websocket.accept()
        user = db.query(User).filter(User.username == username).first()
        if not user:
            user = User(username=username, gender="not_specified")
            db.add(user)
            db.commit()
        self.active_connections[username] = websocket

    def disconnect(self, username: str, db: Session):
        if username in self.active_connections:
            del self.active_connections[username]

    async def join_group(self, username: str, group_name: str, db: Session):
        # Check if the group exists, if not, create it
        group = db.query(Group).filter(Group.name == group_name).first()
        if not group:
            group = Group(name=group_name)
            db.add(group)
            db.commit()

        user = db.query(User).filter(User.username == username).first()
        if group not in user.groups:
            user.groups.append(group)
            db.commit()

        # Add user to the group connections
        if group_name not in self.group_connections:
            self.group_connections[group_name] = []
        self.group_connections[group_name].append(self.active_connections[username])

    async def leave_group(self, username: str, group_name: str, db: Session):
        user = db.query(User).filter(User.username == username).first()
        group = db.query(Group).filter(Group.name == group_name).first()
        if group and user in group.users:
            user.groups.remove(group)
            db.commit()

        # Remove the user's connection from the group
        if group_name in self.group_connections:
            self.group_connections[group_name].remove(self.active_connections[username])

    async def send_message_to_group(self, message: str, group_name: str):
        if group_name in self.group_connections:
            for connection in self.group_connections[group_name]:
                await connection.send_text(message)
