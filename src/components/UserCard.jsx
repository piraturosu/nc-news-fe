function UserCard({ user }) {
  return (
    <div className="flex flex-col items-center">
      <img
        src={user.avatar_url}
        alt={user.username}
        className="rounded-full size-12"
      />
    </div>
  );
}

export default UserCard;
