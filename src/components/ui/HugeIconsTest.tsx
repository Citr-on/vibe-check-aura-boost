import React from 'react';

/**
 * Test component to verify HugeIcons integration
 * Testing common icon patterns and imports
 */
export const HugeIconsTest: React.FC = () => {
  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-bold">HugeIcons Test Component</h2>
      <div className="space-y-2">
        <p className="text-muted-foreground">
          Testing HugeIcons package integration...
        </p>
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">
            Import pattern: import {`{ IconName }`} from '@hugeicons/react'
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Usage: {`<IconName size={24} variant="twotone" className="text-primary" />`}
          </p>
        </div>
      </div>
      
      {/* Test common icon names */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="p-3 border rounded">
          <h3 className="font-medium mb-2">Navigation Icons</h3>
          <div className="text-sm text-muted-foreground">
            • Home01Icon, User01Icon, Settings01Icon<br/>
            • Add01Icon, ArrowUp01Icon, ArrowDown01Icon
          </div>
        </div>
        <div className="p-3 border rounded">
          <h3 className="font-medium mb-2">Action Icons</h3>
          <div className="text-sm text-muted-foreground">
            • Search01Icon, Filter01Icon, Edit01Icon<br/>
            • Delete01Icon, Share01Icon, Download01Icon
          </div>
        </div>
      </div>
    </div>
  );
};

export default HugeIconsTest;