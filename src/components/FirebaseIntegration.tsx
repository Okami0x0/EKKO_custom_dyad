import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Flame } from "lucide-react"; // Firebase flame icon
import { useSettings } from "@/hooks/useSettings";
import { showSuccess, showError } from "@/lib/toast";

export function FirebaseIntegration() {
  const { settings, updateSettings } = useSettings();
  const [isDisconnecting, setIsDisconnecting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    projectId: settings?.firebase?.projectId || "",
    webApiKey: settings?.firebase?.webApiKey || "",
    authDomain: settings?.firebase?.authDomain || "",
    storageBucket: settings?.firebase?.storageBucket || "",
    messagingSenderId: settings?.firebase?.messagingSenderId || "",
    appId: settings?.firebase?.appId || "",
  });

  const handleDisconnectFromFirebase = async () => {
    setIsDisconnecting(true);
    try {
      const result = await updateSettings({
        firebase: undefined,
      });
      if (result) {
        showSuccess("Successfully disconnected from Firebase");
      } else {
        showError("Failed to disconnect from Firebase");
      }
    } catch (err: any) {
      showError(
        err.message || "An error occurred while disconnecting from Firebase",
      );
    } finally {
      setIsDisconnecting(false);
    }
  };

  const handleSaveConfiguration = async () => {
    try {
      const result = await updateSettings({
        firebase: {
          projectId: formData.projectId,
          webApiKey: formData.webApiKey,
          authDomain: formData.authDomain,
          storageBucket: formData.storageBucket,
          messagingSenderId: formData.messagingSenderId,
          appId: formData.appId,
        },
      });
      if (result) {
        showSuccess("Firebase configuration saved successfully");
        setIsEditing(false);
      } else {
        showError("Failed to save Firebase configuration");
      }
    } catch (err: any) {
      showError(err.message || "Failed to save Firebase configuration");
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Check if Firebase is configured
  const isConfigured = !!settings?.firebase?.projectId;

  if (!isConfigured && !isEditing) {
    return (
      <div className="p-4 border border-orange-200 rounded-lg bg-orange-50 dark:bg-orange-900/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Flame className="h-5 w-5 text-orange-600" />
            <div>
              <h3 className="text-sm font-medium text-orange-800 dark:text-orange-200">
                Firebase Integration
              </h3>
              <p className="text-xs text-orange-600 dark:text-orange-300 mt-1">
                Configure Firebase for your projects
              </p>
            </div>
          </div>
          <Button
            onClick={() => setIsEditing(true)}
            variant="outline"
            size="sm"
            className="border-orange-300 text-orange-700 hover:bg-orange-100"
          >
            Configure Firebase
          </Button>
        </div>
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className="p-4 border border-orange-200 rounded-lg bg-orange-50 dark:bg-orange-900/20">
        <div className="flex items-center gap-3 mb-4">
          <Flame className="h-5 w-5 text-orange-600" />
          <h3 className="text-sm font-medium text-orange-800 dark:text-orange-200">
            Firebase Configuration
          </h3>
        </div>
        <div className="space-y-3">
          <div>
            <Label htmlFor="projectId" className="text-xs">Project ID</Label>
            <Input
              id="projectId"
              value={formData.projectId}
              onChange={(e) => handleInputChange("projectId", e.target.value)}
              placeholder="your-project-id"
              className="text-xs"
            />
          </div>
          <div>
            <Label htmlFor="webApiKey" className="text-xs">Web API Key</Label>
            <Input
              id="webApiKey"
              type="password"
              value={formData.webApiKey}
              onChange={(e) => handleInputChange("webApiKey", e.target.value)}
              placeholder="AIza..."
              className="text-xs"
            />
          </div>
          <div>
            <Label htmlFor="authDomain" className="text-xs">Auth Domain</Label>
            <Input
              id="authDomain"
              value={formData.authDomain}
              onChange={(e) => handleInputChange("authDomain", e.target.value)}
              placeholder="your-project.firebaseapp.com"
              className="text-xs"
            />
          </div>
          <div>
            <Label htmlFor="storageBucket" className="text-xs">Storage Bucket</Label>
            <Input
              id="storageBucket"
              value={formData.storageBucket}
              onChange={(e) => handleInputChange("storageBucket", e.target.value)}
              placeholder="your-project.appspot.com"
              className="text-xs"
            />
          </div>
          <div>
            <Label htmlFor="messagingSenderId" className="text-xs">Messaging Sender ID</Label>
            <Input
              id="messagingSenderId"
              value={formData.messagingSenderId}
              onChange={(e) => handleInputChange("messagingSenderId", e.target.value)}
              placeholder="123456789"
              className="text-xs"
            />
          </div>
          <div>
            <Label htmlFor="appId" className="text-xs">App ID</Label>
            <Input
              id="appId"
              value={formData.appId}
              onChange={(e) => handleInputChange("appId", e.target.value)}
              placeholder="1:123456789:web:abcdef"
              className="text-xs"
            />
          </div>
          <div className="flex gap-2 pt-2">
            <Button
              onClick={handleSaveConfiguration}
              size="sm"
              className="flex-1"
            >
              Save Configuration
            </Button>
            <Button
              onClick={() => setIsEditing(false)}
              variant="outline"
              size="sm"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Flame className="h-5 w-5 text-orange-600" />
          <div>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Firebase Integration
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Connected to project: <span className="font-mono">{settings?.firebase?.projectId}</span>
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => setIsEditing(true)}
            variant="outline"
            size="sm"
          >
            Edit Config
          </Button>
          <Button
            onClick={handleDisconnectFromFirebase}
            variant="destructive"
            size="sm"
            disabled={isDisconnecting}
          >
            {isDisconnecting ? "Disconnecting..." : "Disconnect"}
          </Button>
        </div>
      </div>
    </div>
  );
}
