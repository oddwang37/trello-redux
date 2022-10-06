import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CardsType } from 'types/columns';
import { commentsSlice } from 'state/ducks/comments';

interface CardsState {
  cards: CardsType;
}

const initialState: CardsState = {
  cards: [],
};

export const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    addCard: (state, action: PayloadAction<{ columnId: string; title: string; id: string }>) => {
      state.cards.push({
        id: action.payload.id,
        title: action.payload.title,
        description: '',
        comments: [],
      });
    },
    editCardTitle: (state, action: PayloadAction<{ cardId: string; newTitle: string }>) => {
      state.cards = state.cards.map((card) => {
        if (card.id === action.payload.cardId) {
          return { ...card, title: action.payload.newTitle };
        } else return card;
      });
    },
    editDescription: (state, action: PayloadAction<{ cardId: string; newDescription: string }>) => {
      state.cards = state.cards.map((card) => {
        if (card.id === action.payload.cardId) {
          return { ...card, description: action.payload.newDescription };
        } else return card;
      });
    },
    deleteDescription: (state, action: PayloadAction<{ cardId: string }>) => {
      state.cards = state.cards.map((card) => {
        if (card.id === action.payload.cardId) {
          return { ...card, description: '' };
        } else return card;
      });
    },
    deleteCard: (state, action: PayloadAction<{ cardId: string; columnId: string }>) => {
      state.cards = state.cards.filter((card) => card.id !== action.payload.cardId);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      commentsSlice.actions.addComment,
      (state, action: PayloadAction<{ id: string; cardId: string; text: string }>) => {
        const { id, cardId } = action.payload;
        state.cards = state.cards.map((card) => {
          if (card.id === cardId) {
            return {
              ...card,
              comments: [...card.comments, id],
            };
          } else return card;
        });
      },
    );
    builder.addCase(
      commentsSlice.actions.deleteComment,
      (state, action: PayloadAction<{ commentId: string; cardId: string }>) => {
        state.cards = state.cards.map((card) => {
          if (card.id === action.payload.cardId) {
            const newComments = card.comments.filter(
              (comment) => comment !== action.payload.commentId,
            );
            return { ...card, comments: newComments };
          } else return card;
        });
      },
    );
  },
});

export const { addCard, editCardTitle, deleteCard, editDescription, deleteDescription } =
  cardsSlice.actions;

export default cardsSlice.reducer;
