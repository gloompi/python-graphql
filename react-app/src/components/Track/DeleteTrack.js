import React, { useContext } from "react";
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import IconButton from "@material-ui/core/IconButton";
import TrashIcon from "@material-ui/icons/DeleteForeverOutlined";

import { UserContext } from '../../Root';
import { GET_TRACKS_QUERY } from '../../pages/App';

const DeleteTrack = ({ track }) => {
  const currentUser = useContext(UserContext)
  const isCurrentUser = currentUser.id === track.postedBy.id

  const handleDelete = (deleteTrack) => {
    try {
      deleteTrack()
    } catch (error) {
      console.error('Error while deleting track', error)
    }
  }

  return isCurrentUser && (
    <Mutation
      mutation={DELETE_TRACK_MUTATION}
      variables={{ trackId: track.id }}
      refetchQueries={() => [{ query: GET_TRACKS_QUERY }]}
    >
      {deleteTrack => (
        <IconButton onClick={() => handleDelete(deleteTrack)}>
          <TrashIcon />
        </IconButton>
      )}
    </Mutation>
  );
};

const DELETE_TRACK_MUTATION = gql`
  mutation($trackId: Int!) {
    deleteTrack(trackId: $trackId) {
      trackId
    }
  }
`;

export default DeleteTrack;
