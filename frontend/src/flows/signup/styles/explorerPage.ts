import styled from "styled-components";

export const Container = styled.div`
  font-family: Arial, sans-serif;
  padding: 20px;
`;

export const DirectoryHeader = styled.h2`
  color: #333;
`;

export const CreateButton = styled.button`
  background-color: #28a745;
  color: white;
  padding: 10px 15px;
  margin-bottom: 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }
`;

export const ItemList = styled.ul`
  list-style-type: none;
  padding-left: 0;
`;
