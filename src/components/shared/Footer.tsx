export default function Footer() {
  return (
    <footer className="footer border-t border-base-200 bg-white text-base-content p-6">
      <div className="w-full flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto">
        <aside className="items-center grid-flow-col">
          <p className="font-semibold text-gray-700">
            বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
          </p>
        </aside>
        <nav className="md:place-self-center md:justify-self-end mt-4 md:mt-0">
          <p className="text-sm text-gray-500 italic">
            "সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।"
          </p>
        </nav>
      </div>
    </footer>
  );
}
