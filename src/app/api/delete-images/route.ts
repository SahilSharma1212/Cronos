// /pages/api/delete-image.ts

import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' })
  }

  const { fileId } = req.body

  if (!fileId) {
    return res.status(400).json({ error: 'fileId is required' })
  }

  try {
    const response = await axios.delete(`https://api.imagekit.io/v1/files/${fileId}`, {
      auth: {
        username: process.env.PRIVATE_KEY!,
        password: 'Imagekitkapassword1',
      },
    })

    return res.status(200).json({ success: true, data: response.data })
  } catch (error) {
    return res.status(500).json({ error: error || 'Failed to delete image' })
  }
}
