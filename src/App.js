const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList />
      </div>
    </div>
  );
}

function FriendsList() {
  const friends = initialFriends;
  return (
    <div>
      <ul>
        {friends.map((friend) => (
          <Friends friend={friend} key={friend.id} />
        ))}
      </ul>
    </div>
  );
}
function Friends({ friend }) {
  return (
    <div>
      <li>
        <img src={friend.image} alt={friend.name}></img>
        {friend.name}
        <p
          className={
            friend.balance > 0 ? "green" : friend.balance < 0 ? "red" : "black"
          }>
          {friend.balance > 0
            ? `${friend.name} owes you ${friend.balance}$`
            : friend.balance < 0
            ? `you owe ${friend.name} ${Math.abs(friend.balance)}$`
            : `you and ${friend.name} are good`}
        </p>
        <button className="button">Select</button>
      </li>
    </div>
  );
}
