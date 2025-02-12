import { Badge } from "./ui/badge"

const levels = {
    0: { name: "Leve", bg: "bg-green-100", text: "text-green-700" },
    1: { name: "Moderada", bg: "bg-yellow-100", text: "text-yellow-700" },
    2: { name: "Grave", bg: "bg-orange-100", text: "text-orange-700" },
    3: { name: "Anafilaxia", bg: "bg-red-100", text: "text-red-700" },
  };

interface SeverityProps {
    level: 1 | 2 | 3 | 4;
}

const Severity = ({ level }: SeverityProps) => {
    const allergy = levels[level] || { name: "Desconocido", bg: "bg-gray-100", text: "text-gray-700" }

    return (
        <Badge variant='outline' className={`${allergy.bg} ${allergy.text} hover:${allergy.bg}`}>
            {allergy.name}
        </Badge>
    )
}

export default Severity