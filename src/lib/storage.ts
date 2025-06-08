import { createSupabaseClient } from './supabase'

export async function uploadProductImage(file: File, productName: string): Promise<string | null> {
  const supabase = createSupabaseClient()
  
  // Create a unique filename
  const fileExt = file.name.split('.').pop()
  const fileName = `${productName.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.${fileExt}`
  
  try {
    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage
      .from('product-images')
      .upload(fileName, file)

    if (error) {
      console.error('Error uploading image:', error)
      return null
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('product-images')
      .getPublicUrl(fileName)

    return publicUrl
  } catch (error) {
    console.error('Failed to upload image:', error)
    return null
  }
}

export async function deleteProductImage(imageUrl: string): Promise<boolean> {
  const supabase = createSupabaseClient()
  
  try {
    // Extract filename from URL
    const fileName = imageUrl.split('/').pop()
    if (!fileName) return false

    const { error } = await supabase.storage
      .from('product-images')
      .remove([fileName])

    if (error) {
      console.error('Error deleting image:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Failed to delete image:', error)
    return false
  }
}
