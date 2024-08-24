import { useState } from "react";

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

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}
export default function App() {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriend, setselectedFriend] = useState(null);

  function handleAddtoList(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  }

  function handleShowAddFriend() {
    setShowAddFriend((show) => !show);
  }

  function handleSelectedFriend(friend) {
    // setselectedFriend(friend);
    setselectedFriend((cur) =>
      selectedFriend?.id === friend?.id ? null : friend
    );
    setShowAddFriend(false);
  }

  function handleSplit(value) {
    console.log(value);
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
    setselectedFriend(null);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          onSelection={handleSelectedFriend}
          selectedFriend={selectedFriend}
        />

        {showAddFriend && <FormAddFriend onAddFriend={handleAddtoList} />}

        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "Close" : "Add Friend"}
        </Button>
      </div>
      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onHandleSplit={handleSplit}
        />
      )}
    </div>
  );
}

function FriendsList({ friends, onSelection, selectedFriend }) {
  return (
    <div>
      <ul>
        {friends.map((friend) => (
          <Friends
            friend={friend}
            key={friend.id}
            onSelection={onSelection}
            selectedFriend={selectedFriend}
          />
        ))}
      </ul>
    </div>
  );
}
function Friends({ friend, onSelection, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id;
  return (
    <div>
      <li className={isSelected ? "selected" : ""}>
        {" "}
        <img src={friend.image} alt={friend.name}></img>
        {friend.name}
        <p
          className={
            friend.balance > 0 ? "green" : friend.balance < 0 ? "red" : "black"
          }>
          {friend.balance > 0
            ? `${friend.name} owes you ${friend.balance}$`
            : friend.balance < 0
            ? `You owe ${friend.name} ${Math.abs(friend.balance)}$`
            : `You and ${friend.name} are good`}
        </p>
        <Button onClick={() => onSelection(friend)}>
          {isSelected ? "close" : "select"}
        </Button>
      </li>
    </div>
  );
}

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48?u=118836");

  function handleAddFriend(e) {
    e.preventDefault();
    if (!name || !image) return;
    const id = crypto.randomUUID();
    const newFriend = { name, image: `${image}?=${id}`, balance: 0, id };
    console.log("from here");
    console.log(newFriend);

    onAddFriend(newFriend);
    setName("");
    setImage("https://i.pravatar.cc/48?u=118836");
  }
  return (
    <form className="form-add-friend" onSubmit={handleAddFriend}>
      <label>👯‍♀️ Friend Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}></input>

      <label>🎇 Image url</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}></input>

      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill({ selectedFriend, onHandleSplit }) {
  const [bill, setBill] = useState("");
  const [paidByYou, setPaidByYou] = useState("");
  const friendExpense = bill ? bill - paidByYou : "";
  const [whoIsPaying, setWhoIsPaying] = useState("you");

  function handleSubmit(e) {
    e.preventDefault();
    if (!bill || !paidByYou) return;
    onHandleSplit(whoIsPaying === "you" ? friendExpense : -paidByYou);
  }
  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>SPLIT A BILL WITH {selectedFriend.name}</h2>

      <label>💰 Bill Value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}></input>

      <label>🧍🏻‍♀️ Your Expense</label>
      <input
        type="text"
        value={paidByYou}
        onChange={(e) =>
          setPaidByYou(
            Number(e.target.value) > bill ? paidByYou : Number(e.target.value)
          )
        }></input>

      <label>👯{selectedFriend.name} Expense:</label>
      <input type="text" disabled value={friendExpense}></input>

      <label>🤑Who is paying the Bill?</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}>
        <option value="you">You</option>
        <option value="friend">Friend</option>
      </select>

      <Button>Split Bill</Button>
    </form>
  );
}
