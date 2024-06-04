const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

export default function DaysOfWeek() {
  return (
    <div className="grid grid-cols-7 gap-1 mt-2 font-semibold">
      {daysOfWeek.map((day, index) => (
        <div
          key={index}
          className={`text-center ${index === daysOfWeek.length - 2 || index === daysOfWeek.length - 1 ? 'text-[#9b9b9b]' : ''}`}
        >
          {day}
        </div>
      ))}
    </div>
  );
}
