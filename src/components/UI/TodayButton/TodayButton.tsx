import { useMonthStore } from "../../../store/useMonthStore";

function TodayButton() {
  const setCurrentMonth = useMonthStore(state => state.setCurrentMonth);

  return (
    <button
      className="button"
      onClick={setCurrentMonth}
      type="button"
    >
      Сегодня      
    </button>
  );
};

export default TodayButton;