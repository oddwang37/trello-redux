import { createSelector } from '@reduxjs/toolkit';

import { Comments, Comment, CardType } from 'types/columns';
import { RootState } from 'state/store';
import { selectAllCards } from '../cards/selectors';

export const selectAllComments = (state: RootState) => state.comments.comments;

export const selectCommentsOfCard = createSelector(
  [selectAllCards, selectAllComments, (state: RootState, cardId: string) => cardId],
  (allCards, allComments, cardId) => {
    const card = allCards.find((card: CardType) => card.id === cardId);
    if (card) {
      const commentsIds = card.comments;
      const cardComments: Comments = [];
      allComments.forEach((comment: Comment) => {
        if (commentsIds.includes(comment.id)) {
          cardComments.push(comment);
        }
      });
      return cardComments;
    } else return [];
  },
);
