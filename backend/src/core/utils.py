import os

from fastapi import Request
from fastapi.templating import Jinja2Templates

STATIC_DIR = os.path.join(
    os.path.abspath(os.path.dirname(__file__)), os.path.join("../../static")
)
TEMPLATE_DIR = os.path.join(STATIC_DIR, "templates")
templates = Jinja2Templates(directory=TEMPLATE_DIR)
# Get the absolute path to the 'static' directory


def check_accept_header(request: Request) -> bool:
    """Returns true if the request is made on the browser html and false if made by application/JSONResponse

    Args:
        request (Request): default request

    Returns:
        bool: return type of the function
    """
    accept_header = request.headers.get("Accept")
    return "text/html" in accept_header if accept_header else False


"""To enforce role based access control"""
