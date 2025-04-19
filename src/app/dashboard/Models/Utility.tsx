import Cookies from "js-cookie";
import {User} from "@/app/dashboard/Models/User";
import {ERole} from "@/app/dashboard/Models/enumeration/ERole";

export  class Utility {
    public static getCurrentUserRole(){
        const userJson = Cookies.get("account");
        let  isAdmin = false;
        let  isTeacher = false;
        let isStudent =false;
        if (userJson) {

            const parsed = JSON.parse(userJson);
            const user = User.fromJson(parsed);  // Now it's a real User instance again!

            isAdmin = user.hasRole('ROLE_ADMIN');
            isTeacher = user.hasRole('ROLE_MODERATOR');
            isStudent = user.hasRole('ROLE_USER');

            if (isAdmin){
                return ERole.ROLE_ADMIN
            }else if(isTeacher){
                return ERole.ROLE_MODERATOR;
            }else if(isStudent){
                return ERole.ROLE_USER;
            }

        }
    };
}