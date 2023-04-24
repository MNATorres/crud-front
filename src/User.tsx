function User({ user, deleteUser, _id }: any) {
  return (
    <li key={_id} className="card">
      <button onClick={() => deleteUser(user._id)} className="buttonDelete">X</button>
      <p>Nombre: </p>{user.name}
      <p>Edad: </p>{user.age}
      <p>email: </p>{user.email}
    </li>
  );
}

export default User;