import React from "react";
import { gql, useQuery } from "@apollo/client";
import { DateTime } from "luxon";
import { NavLink } from "react-router-dom";
import { MemberType } from "../types";

function Card({ member }: { member: MemberType }) {
  return (
    <NavLink
      exact
      to={`/client/member/${member?.id}`}
      style={{
        borderRadius: 4,
        borderWidth: "0.5px",
        borderColor: "black",
        borderStyle: "solid",
        width: 160,
        height: 64,
        padding: 8,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        marginRight: 12,
        marginBottom: 12,
        textDecoration: "none",
      }}
    >
      <div style={{ color: "black" }}>
        {member?.firstName} {member?.lastName}
      </div>
      <div style={{ fontSize: 13, color: "gray" }}>
        {DateTime.fromMillis(member?.dateJoined).toLocaleString(
          DateTime.DATE_FULL
        )}
      </div>
    </NavLink>
  );
}

function Members() {
  const { data } = useQuery<{ members: MemberType[] }>(
    gql`
      {
        members {
          id
          firstName
          lastName
          dateJoined
        }
      }
    `
  );
  return (
    <div style={{ width: "100%", display: "flex", flexWrap: "wrap" }}>
      {data?.members?.map((el) => (
        <Card key={el?.id} member={el} />
      ))}
    </div>
  );
}

export default Members;
