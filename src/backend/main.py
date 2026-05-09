"""
@file       main.py
@brief      Backend driver.
@date       05-2026
"""

#
#   Testing
#

import django
import os

from fastapi import FastAPI
from django.core.asgi import get_asgi_application
from django.core.handlers.asgi import ASGIHandler


os.environ.setdefault(
    "DJANGO_SETTINGS_MODULE",
    "src.backend.fsuy_django.settings"
)


django.setup()
django_asgi_application: ASGIHandler = get_asgi_application()


app = FastAPI()
app.mount("/django", django_asgi_application)


@app.get("/")
def nothing():
    return {
        "hello": "world"
    }


#
#
#   Executing
#
#

def main():
    return None


if __name__ == "__main__":
    main()
