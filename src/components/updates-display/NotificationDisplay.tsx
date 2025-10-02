import { authApi } from "@/lib/axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type NotificationType = {
  id: string;
  title: string;
  message: string;
  notificationType: string;
  read: boolean;
  eventId: string | null;
  createdAt: string;
  postId: string | null;
  refundId: string | null;
  orderId: string | null;
  relatedUserId: string | null;
};

function NotificationsDisplay() {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await authApi.get("/notification", {
        params: {
          pageNumber: 1,
          pageSize: 10,
          sortBy: "createdAt",
        },
      });
      const data = response.data.data.data;
      setNotifications(data);
      console.log(data);
    } catch (err) {
      setError("Failed to load notifications");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  if (loading) {
    return (
      <div className="px-2 mt-2 space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <NotificationSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-2 mt-2">
        <div className="p-6 text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchNotifications}
            className="px-4 py-2 bg-black text-white rounded-full hover:bg-neutral-800 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (notifications.length === 0) {
    return (
      <div className="px-2 mt-2">
        <div className="p-6 text-center text-gray-500">
          <p>No notifications yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-2 mt-2 mb-20">
      {notifications.map((notification) => (
        <NotificationComponent
          key={notification.id}
          notification={notification}
        />
      ))}
    </div>
  );
}

function NotificationSkeleton() {
  return (
    <div className="p-3 border-b border-b-neutral-400 flex gap-4 items-center">
      <div className="bg-neutral-300 p-2 rounded-2xl w-12 h-12 animate-pulse"></div>
      <div className="flex-1">
        <div className="h-5 bg-neutral-300 rounded w-3/4 mb-2 animate-pulse"></div>
        <div className="h-4 bg-neutral-300 rounded w-full animate-pulse"></div>
      </div>
      <div className="h-4 bg-neutral-300 rounded w-16 animate-pulse"></div>
    </div>
  );
}

function NotificationComponent({
  notification,
}: {
  notification: NotificationType;
}) {
  const router = useRouter();
  function formatTime(isoString: string) {
    const date = new Date(isoString);

    let hours = date.getHours();
    let minutes = date.getMinutes();

    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    const formattedMinutes = minutes.toString().padStart(2, "0");

    return `${hours}:${formattedMinutes} ${ampm}`;
  }

  return (
    <div
      className="p-3 border-b border-b-neutral-400 flex gap-4 items-center hover:bg-neutral-50 transition-colors"
      onClick={() => {
        switch (notification.notificationType?.toUpperCase()) {
          case "CO_HOST_INVITATION":
          case "CO_HOST_ACCEPTANCE":
          case "CO_HOST_REMOVAL":
          case "CO_HOST_REJECTION":
            router.push(
              `/m/user/${notification.relatedUserId}?prev=/?screen=updates`
            );
            break;
          case "PAYMENT_PROCESSED_SUCCESSFULLY":
          case "EVENT_EARNINGS_PAID":
          case "WITHDRAWAL_SUCCESSFUL":
          case "WITHDRAWAL_FAILED":
          case "SUCCESSFUL_REFUND":
          case "FAILED_REFUND":
            router.push(
              "/m/wallet?prev=%2Fm%2Fsettings%2Fpayment-method%3Fprev%3D%252Fm%252Fsettings%253Fprev%253D%25252F%25253Fscreen%25253Dupdates"
            );
          case "NEW_EVENT_ORDER":
          case "NEW_SUBSCRIBER":
          case "NEW_POST_COMMENT":
          case "NEW_EVENT_COMMENT":
          case "NEW_EVENT_REACTION":
          case "NEW_POST_REACTION":
          case "NEW_CHAT_MESSAGE":
            return;
          default:
            return;
        }
      }}
    >
      <div className="bg-black p-3 rounded-md w-12  flex-shrink-0 ">
        <Image src="/logo-white.svg" alt="" width={40} height={40} />
      </div>
      <div>
        <h3 className="font-bold text-lg mb-2 text-ellipsis w-4/6 whitespace-nowrap">
          {notification.title}
        </h3>
        <p className="font-medium text-base">{notification.message}</p>
      </div>
      <div className="text-sm font-light w-max whitespace-nowrap">
        {formatTime(notification.createdAt)}
      </div>
    </div>
  );
}

export default NotificationsDisplay;
