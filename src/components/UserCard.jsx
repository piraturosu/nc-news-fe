function UserCard({ user }) {
  return (
    <div className="flex flex-col items-center">
      <img
        src={user.avatar_url}
        alt={user.username}
        className="border rounded-md size-12"
      />
      <div>{user.username}</div>
    </div>
  );
}

export default UserCard;
