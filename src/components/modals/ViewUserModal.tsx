import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { CalendarDays, Mail, User, CheckCircle, XCircle } from "lucide-react";

export interface UserData {
  id: number;
  userName: string;
  fullName: string;
  email: string;
  isActive: boolean;
  roleName: string;
  createdOn: string;
  assessmentCompleted: boolean;
  resumeUploaded: boolean;
}


export interface ViewUserModalProps {
  isOpen: boolean;
  user: UserData | null;
  onClose: () => void;
  onStatusToggle: (userId: number, status: boolean) => void;
}


export const ViewUserModal = ({ isOpen, onClose, user, onStatusToggle }: ViewUserModalProps) => {
  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            User Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Full Name</label>
              <p className="text-lg font-semibold">{user.fullName}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">Email Address</label>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <p className="text-sm">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center">
              <div style={{ width: "50%" }}>
                <label className="text-sm font-medium text-gray-600">Join Date</label>
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-gray-400" />
                  <p className="text-sm">
                    {new Date(user.createdOn).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div style={{ width: "50%" }}>
                <label className="text-sm font-medium text-gray-600">Status</label>
                <div className="flex items-center gap-3 mt-1">
                  <Switch
                    checked={user.isActive}
                    onCheckedChange={(checked) =>
                      onStatusToggle(user.id, checked)
                    }
                    className="data-[state=checked]:bg-blue-600"
                  />

                  <Badge variant={user.isActive ? "default" : "secondary"}>
                    {user.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-medium text-gray-800 mb-3">Activity Status</h4>
            <div className="space-y-2 flex justify-between items-center">
              <div className="flex items-center" style={{ width: "50%" }}>
                {user.assessmentCompleted ? (
                  <CheckCircle className="h-5 w-5 text-blue-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
                <span className="text-sm text-gray-600 ml-2">
                  Assessment Completed
                </span>
              </div>

              <div className="flex items-center" style={{ width: "50%", marginTop: "0" }}>
                {user.resumeUploaded ? (
                  <CheckCircle className="h-5 w-5 text-blue-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
                <span className="text-sm text-gray-600 ml-2">
                  Resume Uploaded
                </span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
