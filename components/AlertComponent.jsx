import { Badge } from "@/components/ui/badge";

function AlertComponent(props) {
  return (
    <div>
      <div className="flex gap-4 items-center px-4 py-2 rounded-lg border bg-background shadow-sm">
        <Badge>
          <span className="text-xs">{props.badgeMessage}</span>
        </Badge>
        <p className="text-xs">{props.alertMessage} &rarr;</p>
      </div>
    </div>
  );
}

export default AlertComponent;
