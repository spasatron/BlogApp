from enum import Enum

from typing import Dict, Optional, List
from pydantic import BaseModel


class EntityRange(BaseModel):
    key: int
    offset: int
    length: int

class InlineStyleRange(BaseModel):
    style: str
    offset: int
    length: int


class DraftBlockType(str, Enum):
    unstyled = 'unstyled'
    paragraph = 'paragraph'
    header_one = 'header-one'
    header_two = 'header-two'
    header_three = 'header-three'
    header_four = 'header-four'
    header_five = 'header-five'
    header_six = 'header-six'
    unordered_list_item = 'unordered-list-item'
    ordered_list_item = 'ordered-list-item'
    blockquote = 'blockquote'
    code_block = 'code-block'
    atomic = 'atomic'
    section = 'section'
    article = 'article'


class DraftEntityMutability(str, Enum):
    mutable = 'MUTABLE'
    immutable = 'IMMUTABLE'
    segmented = 'SEGMENTED'


class RawDraftEntity(BaseModel):
    type: str
    mutability: DraftEntityMutability
    data: Optional[Dict[str,any]]
    class Config:
        arbitrary_types_allowed=True


class RawDraftContentBlock(BaseModel):
    key: Optional[str] = None
    type: DraftBlockType
    text: str
    depth: Optional[int] = None
    inlineStyleRanges: Optional[List[InlineStyleRange]] = None
    entityRanges: Optional[List[EntityRange]] = None
    children: Optional['RawDraftContentBlock'] = None


class RawDraftContentState(BaseModel):
    blocks: List['RawDraftContentBlock']
    entityMap: Dict[str, RawDraftEntity]



