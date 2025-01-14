import GeneralInfo from "../../components/Modulos/LugarYHorarios";
import Timer from "../../components/Modulos/FechaYTimer";
import Intro from "../../components/Modulos/Intro";

export default function Home() {
  return (
    <div className="min-h-screen relative bg-pink-50 flex flex-col items-center">
      <div className="w-full max-w-2xl mx-auto">
        <Intro />
        <Timer />
        <GeneralInfo />
      </div>
    </div>
  );
}
