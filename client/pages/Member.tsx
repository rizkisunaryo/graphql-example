import { gql, useQuery } from "@apollo/client";
import { DateTime } from "luxon";
import React from "react";
import { NavLink, useParams } from "react-router-dom";
import { MemberType } from "../types";

function Row(props: { left: string; right: string }) {
  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: 40 }}>{props.left}</div>
      <div>:&nbsp;</div>
      <div style={{ flex: 1 }}>{props.right}</div>
    </div>
  );
}

function Member() {
  const { id } = useParams();
  const { data } = useQuery<{ member: MemberType }>(
    gql`
      query Member($id: Int!) {
        member(id: $id) {
          avatarImage
          firstName
          lastName
          dateJoined
          role
          skills
          bio
        }
      }
    `,
    { variables: { id: Number(id) } }
  );
  const member = data?.member;

  return (
    <>
      <NavLink exact to="/client/members">
        members
      </NavLink>
      <div style={{ height: 20 }} />
      <div style={{ display: "flex" }}>
        <img
          src={member?.avatarImage}
          style={{ width: 200, height: 200, objectFit: "cover" }}
        />
        <div style={{ width: 8 }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 17 }}>
            {member?.firstName} {member?.lastName}
          </div>
          <div style={{ fontWeight: "bold" }}>{member?.role}</div>
          <div style={{ height: 16 }} />
          <Row
            left="Join"
            right={DateTime.fromMillis(member?.dateJoined || 0).toLocaleString(
              DateTime.DATE_FULL
            )}
          />
          <Row left="Skills" right={member?.skills?.join(", ")} />
          <Row left="Bio" right={member?.bio} />
        </div>
      </div>
    </>
  );
}

export default Member;
