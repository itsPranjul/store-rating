export default function FormInput({ type="text", placeholder, value, onChange }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="
        w-full px-4 py-4
        bg-white/70 backdrop-blur-sm
        border-2 border-gray-200/60
        rounded-xl
        font-medium text-gray-800
        placeholder-gray-400
        transition-all duration-300 ease-out
        focus:outline-none 
        focus:border-purple-500
        focus:bg-white/90
        focus:shadow-[0_0_30px_rgba(147,51,234,0.15)]
        focus:ring-4 focus:ring-purple-500/20
        focus:scale-[1.02]
        hover:border-purple-300
        hover:bg-white/80
        hover:shadow-lg
        hover:scale-[1.01]
      "
      value={value}
      onChange={onChange}
      required
    />
  );
}