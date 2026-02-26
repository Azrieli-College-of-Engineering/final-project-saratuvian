import { type Request, type Response, type NextFunction } from 'express'
import * as challengeUtils from '../lib/challengeUtils'
import * as security from '../lib/insecurity'
import { challenges } from '../data/datacache'

const demoOrders = [
  { id: 1, userId: 1, total: 120, items: ['Apple Juice', 'Banana Juice'] },
  { id: 2, userId: 2, total: 75, items: ['Strawberry Juice'] },
  { id: 3, userId: 1, total: 30, items: ['Water'] }
]

export function retrieveOrderDetails () {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id
      const orderId = parseInt(id, 10)

      const user = security.authenticatedUsers.from(req)

      if (!user) {
        return res.status(401).json({ error: 'Not authenticated' })
      }

      if (!id || id === 'undefined' || id === 'null' || id === 'NaN' || Number.isNaN(orderId)) {
        return res.status(400).json({ error: 'Invalid order id' })
      }

      const order = demoOrders.find(o => o.id === orderId)
      if (!order) {
        return res.status(404).json({ error: 'Order not found' })
      }

      // Mark challenge as solved if the user accesses an order that does NOT belong to them (IDOR)
      const orderChallenge = (challenges as Record<string, any>)['orderIdorChallenge']

      challengeUtils.solveIf(orderChallenge, () => {
      const currentUserId = (user as any)?.data?.id
      return currentUserId != null && order.userId !== currentUserId
      })

      // VULNERABLE ON PURPOSE: no ownership check – returns any order by id
      return res.json(order)
    } catch (err) {
      return next(err as Error)
    }
  }
}