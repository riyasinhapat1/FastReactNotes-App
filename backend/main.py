from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory notes
notes = []

class Note(BaseModel):
    id: int
    title: str
    content: str

@app.get("/api")
def read_root():
    return {"message": "Welcome to the Notes API"}

@app.get("/api/notes")
def get_notes():
    return notes

@app.post("/api/notes")
def create_note(note: Note):
    notes.append(note)
    return note

@app.put("/api/notes/{note_id}")
def update_note(note_id: int, updated_note: Note):
    for idx, n in enumerate(notes):
        if n.id == note_id:
            notes[idx] = updated_note
            return updated_note
    raise HTTPException(status_code=404, detail="Note not found")

@app.delete("/api/notes/{note_id}")
def delete_note(note_id: int):
    for idx, n in enumerate(notes):
        if n.id == note_id:
            return notes.pop(idx)
    raise HTTPException(status_code=404, detail="Note not found")
