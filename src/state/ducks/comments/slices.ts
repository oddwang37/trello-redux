import formatDate from 'utils/formatDate';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CommentsState = {
  comments: { id: string; date: string; text: string }[];
};

const initialState: CommentsState = {
  comments: [],
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state, action: PayloadAction<{ id: string; cardId: string; text: string }>) => {
      const date = formatDate(new Date());
      const { id, text } = action.payload;
      state.comments.push({ id, date, text });
    },
    editComment: (
      state,
      action: PayloadAction<{ cardId: string; commentId: string; newText: string }>,
    ) => {
      const { commentId, newText } = action.payload;
      state.comments = state.comments.map((comment) => {
        if (comment.id === commentId) {
          return { ...comment, text: newText };
        } else return comment;
      });
    },
    deleteComment: (state, action: PayloadAction<{ cardId: string; commentId: string }>) => {
      state.comments = state.comments.filter((comment) => comment.id !== action.payload.commentId);
    },
  },
});

export const { addComment, editComment, deleteComment } = commentsSlice.actions;

export default commentsSlice.reducer;
