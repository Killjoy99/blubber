from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker

DATABASE_URL = (
    "sqlite+aiosqlite:///./test.db"  # Can be replaced with your preferred database
)

engine = create_async_engine(DATABASE_URL, echo=True)
async_session = sessionmaker(engine, expire_on_commit=False, class_=AsyncSession)


async def get_db():
    db = async_session()
    try:
        yield db
    finally:
        await db.close()
