import { UserPlus2 } from "lucide-react";
import React from "react";
import { Link } from "react-router";

const NotAuth = () => {
    return (
        <div
            className={`flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center`}
        >
            <div className={`bg-primary/10 rounded-full p-8`}>
                <UserPlus2 className={`size-10 text-primary`} />
            </div>
            <h3 className="text-2xl font-bold">
                Not Logged in using any user!
            </h3>
            <p className="text-base-content/70">
                Ready to organize your thoughts? Create an account or login, and
                Create you first note to get started on you journey.
            </p>
            <Link to="/auth" className={`btn btn-primary`}>
                Create an account or login
            </Link>
        </div>
    );
};

export default NotAuth;
