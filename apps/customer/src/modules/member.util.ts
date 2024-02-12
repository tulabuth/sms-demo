import { RouterModule } from "@nestjs/core";
import { AuthModule } from "./auth/auth.module";
import { RegisterModule } from "./register/register.module";
import { AccountModule } from "./account/account.module";
import { PlanModule } from "./plan/plan.module";
import { SubscriptionModule } from "./subscription/subscription.module";
import { CreditCardsModule } from "./credit-cards/credit-cards.module";
import { PaymentsModule } from "./payments/payments.module";

export function getModuleMember(){
    return [
        AuthModule,
        RegisterModule,
        AccountModule,
        PlanModule,
        SubscriptionModule,
        CreditCardsModule,
        PaymentsModule,
        RouterModule.register([
            {
                path: 'member',
                children: [
                    AuthModule,
                    RegisterModule,
                    AccountModule,
                    PlanModule,
                    SubscriptionModule,
                    CreditCardsModule,
                    PaymentsModule,
                ]
            }
        ])
    ]
}