#
#   Dockerfile at <fsuy/>
#   ----------
#
#   Last update: 07/05/26

FROM ubuntu:latest
LABEL authors="@HexagonalUnivese"


#   Working directory
RUN mkdir fsuy/
WORKDIR /fsuy/


#   Updating
RUN apt-get update && apt-get install -y \
    python3 \
    python3-venv


#   Virtual environment
RUN python3 -m venv "/fsuy/.venv"
ENV PATH="/fsuy/.venv/bin:$PATH"
RUN bash -c "source /fsuy/.venv/bin/activate"


#   Python setup
COPY "./dependencies/python.txt" "/fsuy/requirements.txt"
RUN ls
RUN pip install --quiet -r "requirements.txt"


#   The other files
COPY "." "/fsuy/"



EXPOSE 4817


RUN printenv
CMD ["python3", "-m", "uvicorn", "--host", "0.0.0.0", "main:app", "--app-dir", "src/backend", "--port", "4817"]

