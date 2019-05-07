import FindReplaceIcon from 'mdi-react/FindReplaceIcon'
import React from 'react'
import { Redirect } from 'react-router'
import * as GQL from '../../../shared/src/graphql/schema'
import { LayoutRouteProps, routes } from '../routes'
import { welcomeAreaRoutes } from './dotcom/welcome/routes'
const WelcomeArea = React.lazy(async () => ({
    default: (await import('./dotcom/welcome/WelcomeArea')).WelcomeArea,
}))
const NewProductSubscriptionPageOrRedirectUser = React.lazy(async () => ({
    default: (await import('./user/productSubscriptions/NewProductSubscriptionPageOrRedirectUser'))
        .NewProductSubscriptionPageOrRedirectUser,
}))
const ChecksArea = React.lazy(async () => ({
    default: (await import('./checks/global/ChecksArea')).ChecksArea,
}))
const ThreadsArea = React.lazy(async () => ({
    default: (await import('./threads/global/ThreadsArea')).ThreadsArea,
}))

export const enterpriseRoutes: ReadonlyArray<LayoutRouteProps> = [
    {
        // Allow unauthenticated viewers to view the "new subscription" page to price out a subscription (instead
        // of just dumping them on a sign-in page).
        path: '/subscriptions/new',
        exact: true,
        render: props => <NewProductSubscriptionPageOrRedirectUser {...props} />,
    },
    {
        // Redirect from old /user/subscriptions/new -> /subscriptions/new.
        path: '/user/subscriptions/new',
        exact: true,
        render: () => <Redirect to="/subscriptions/new" />,
    },

    {
        path: '/start',
        render: () => <Redirect to="/welcome" />,
        exact: true,
    },
    {
        path: '/welcome',
        render: props => <WelcomeArea {...props} routes={welcomeAreaRoutes} />,
    },
    {
        path: '/threads',
        render: props => <ThreadsArea {...props} />,
    },
    {
        path: '/checks',
        render: props => <ChecksArea {...props} />,
    },
    {
        path: '/codemods',
        render: props => <ThreadsArea {...props} kind={GQL.DiscussionThreadKind.CODEMOD} kindIcon={FindReplaceIcon} />,
    },
    ...routes,
]
