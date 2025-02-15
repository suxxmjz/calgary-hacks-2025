import { ChevronLeft, Filter } from "lucide-react";
import React from "react"; 

interface Event {
  title: string;
  description: string;
  time: string;
  image: string;
}

const events: Event[] = [
  {
    title: "Post 1",
    description:
      "hello hello",
    time: "8m ago",
    image:
      "https://images.unsplash.com/photo-1533276383216-0e265173f1a4",
  },
  {
    title: "Post 2",
    description:
      "=fjdbfsfkd.",
    time: "20m ago",
    image:
      "https://images.unsplash.com/photo-1526481280693-3bfa7568e70b",
  },
];

const Profile: React.FC = () => {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <button className="text-gray-500">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold">Profile</h1>
        <button className="text-gray-500">
          <Filter size={24} />
        </button>
      </div>

      <input
        type="text"
        placeholder="Search"
        className="w-full p-2 border rounded-md mb-4"
      />

      <div className="space-y-4">
        {events.map((event, index) => (
          <div key={index} className="border rounded-lg overflow-hidden">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-3">
              <h2 className="font-semibold">{event.title}</h2>
              <p className="text-sm text-gray-500">{event.description}</p>
              <p className="text-xs text-gray-400 mt-2">{event.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
