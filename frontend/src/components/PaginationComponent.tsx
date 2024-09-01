import React from "react";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import {
  setPagination,
  fetchMusicsRequest,
} from "../features/music/musicSlice";
import { RootState } from "../store";

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PageButton = styled.button<{ active: boolean }>`
  background-color: ${({ theme, active }: any) =>
    active ? theme.colors.primary : theme.colors.lightGray};
  color: white;
  border: none;
  border-radius: 4px;
  margin: 0 5px;
  padding: 8px 12px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }: any) => theme.colors.secondary};
  }

  &:disabled {
    background-color: ${({ theme }: any) => theme.colors.disabled};
    cursor: not-allowed;
  }
`;

const Pagination: React.FC = () => {
  const dispatch = useDispatch();
  const { currentPage, totalPages } = useSelector(
    (state: RootState) => state.music
  );

  const handlePageChange = (page: number) => {
    dispatch(setPagination({ page, limit: 6 }));
    dispatch(fetchMusicsRequest({}));
  };

  return (
    <PaginationContainer>
      <PageButton
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
        active={false}
      >
        Previous
      </PageButton>
      {Array.from({ length: totalPages }, (_, i) => (
        <PageButton
          key={i + 1}
          onClick={() => handlePageChange(i + 1)}
          active={currentPage === i + 1}
        >
          {i + 1}
        </PageButton>
      ))}
      <PageButton
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
        active={false}
      >
        Next
      </PageButton>
    </PaginationContainer>
  );
};

export default Pagination;
