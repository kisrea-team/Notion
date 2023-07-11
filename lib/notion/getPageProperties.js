import { getTextContent, getDateValue } from 'notion-utils'
import { NotionAPI } from 'notion-client'
import BLOG from '@/blog.config'
import formatDate from '../formatDate'
// import { createHash } from 'crypto'
//import md5 from 'js-md5'
import { mapImgUrl } from './mapImage'

export default async function getPageProperties(id, block, schema, authToken, tagOptions) {
  const rawProperties = Object.entries(block?.[id]?.value?.properties || [])
  const excludeProperties = ['date', 'select', 'multi_select', 'person']
  const value = block[id]?.value
  const properties = {}
  for (let i = 0; i < rawProperties.length; i++) {
    const [key, val] = rawProperties[i]
    properties.id = id
    if (schema[key]?.type && !excludeProperties.includes(schema[key].type)) {
      properties[schema[key].name] = getTextContent(val)
    } else {
      switch (schema[key]?.type) {
        case 'date': {
          const dateProperty = getDateValue(val)
          delete dateProperty.type
          properties[schema[key].name] = dateProperty
          break
        }
        case 'select':
        case 'multi_select': {
          const selects = getTextContent(val)
          if (selects[0]?.length) {
            properties[schema[key].name] = selects.split(',')
          }
          break
        }
        case 'person': {
          const rawUsers = val.flat()
          const users = []
          const api = new NotionAPI({ authToken })

          for (let i = 0; i < rawUsers.length; i++) {
            if (rawUsers[i][0][1]) {
              const userId = rawUsers[i][0]
              const res = await api.getUsers(userId)
              const resValue =
                res?.recordMapWithRoles?.notion_user?.[userId[1]]?.value
              const user = {
                id: resValue?.id,
                first_name: resValue?.given_name,
                last_name: resValue?.family_name,
                profile_photo: resValue?.profile_photo
              }
              users.push(user)
            }
          }
          properties[schema[key].name] = users
          break
        }
        default:
          break
      }
    }
  }

  // 映射键：用户自定义表头名
  const fieldNames = BLOG.NOTION_PROPERTY_NAME
  if (fieldNames) {
    Object.keys(fieldNames).forEach(key => {
      if (fieldNames[key] && properties[fieldNames[key]]) properties[key] = properties[fieldNames[key]]
    })
  }

  // type\status是下拉选框 取数组第一个
  properties.type = properties.type?.[0]
  properties.status = properties.status?.[0]

  // 映射值：用户个性化type和status字段的下拉框选项，在此映射回代码的英文标识
  mapProperties(properties)

  if (properties.type === BLOG.NOTION_PROPERTY_NAME.type_post) {
    properties.slug = (BLOG.POST_URL_PREFIX) ? generateCustomizeUrl(properties) : (properties.slug ?? properties.id)
  } else if (properties.type === BLOG.NOTION_PROPERTY_NAME.type_page) {
    properties.slug = properties.slug ?? properties.id
  } else if (properties.type === BLOG.NOTION_PROPERTY_NAME.type_menu || properties.type === BLOG.NOTION_PROPERTY_NAME.type_sub_menu) {
    // 菜单路径为空、作为可展开菜单使用
    properties.to = properties.slug ?? null
    properties.name = properties.title ?? ''
  }

  // 开启伪静态路径
  if (BLOG.PSEUDO_STATIC) {
    if (!properties?.slug?.endsWith('.html') && !properties?.slug?.startsWith('http')) {
      properties.slug += '.html'
    }
  }

  properties.createdTime = formatDate(new Date(value.created_time).toString(), BLOG.LANG)
  properties.lastEditedTime = formatDate(new Date(value?.last_edited_time).toString(), BLOG.LANG)
  properties.fullWidth = value.format?.page_full_width ?? false
  properties.pageIcon = mapImgUrl(block[id].value?.format?.page_icon, block[id].value) ?? ''
  properties.pageCover = mapImgUrl(block[id].value?.format?.page_cover, block[id].value) ?? ''
  properties.pageCoverThumbnail = mapImgUrl(block[id].value?.format?.page_cover, block[id].value, 'block', 'pageCoverThumbnail') ?? ''
  properties.content = value.content ?? []
  // properties.password = properties.password
  //   ? md5(properties.slug + properties.password)
  //   : ''
  properties.tagItems = properties?.tags?.map(tag => {
    return { name: tag, color: tagOptions?.find(t => t.value === tag)?.color || 'gray' }
  }) || []
  delete properties.content
  return properties
}

function mapProperties(properties) {
  if (properties?.type === BLOG.NOTION_PROPERTY_NAME.type_post) {
    properties.type = 'Post'
  }
  if (properties?.type === BLOG.NOTION_PROPERTY_NAME.type_page) {
    properties.type = 'Page'
  }
  if (properties?.type === BLOG.NOTION_PROPERTY_NAME.type_notice) {
    properties.type = 'Notice'
  }
  if (properties?.status === BLOG.NOTION_PROPERTY_NAME.status_publish) {
    properties.status = 'Published'
  }
  if (properties?.status === BLOG.NOTION_PROPERTY_NAME.status_invisible) {
    properties.status = 'Invisible'
  }
}

function generateCustomizeUrl(postProperties) {
  let fullSlug = ''
  const allSlugPatterns = BLOG.POST_URL_PREFIX.split('/')
  allSlugPatterns.forEach((pattern, idx) => {
    if (pattern === '%year%' && postProperties?.date?.start_date) {
      const formatPostCreatedDate = new Date(postProperties?.date?.start_date)
      fullSlug += formatPostCreatedDate.getUTCFullYear()
    } else if (pattern === '%month%' && postProperties?.date?.start_date) {
      const formatPostCreatedDate = new Date(postProperties?.date?.start_date)
      fullSlug += String(formatPostCreatedDate.getUTCMonth() + 1).padStart(2, 0)
    } else if (pattern === '%day%' && postProperties?.date?.start_date) {
      const formatPostCreatedDate = new Date(postProperties?.date?.start_date)
      fullSlug += String(formatPostCreatedDate.getUTCDate()).padStart(2, 0)
    } else if (pattern === '%slug%') {
      fullSlug += (postProperties.slug ?? postProperties.id)
    } else if (!pattern.includes('%')) {
      fullSlug += pattern
    } else {
      return
    }
    if (idx !== allSlugPatterns.length - 1) {
      fullSlug += '/'
    }
  })
  if (fullSlug.startsWith('/')) {
    fullSlug = fullSlug.substring(1) // 去掉头部的"/"
  }

  return `${fullSlug}/${(postProperties.slug ?? postProperties.id)}`
}
