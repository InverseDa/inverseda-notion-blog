import { siteConfig } from '@/lib/config'
import Link from 'next/link'
import TagItemMini from './TagItemMini'
import CONFIG from '../config'
import TwikooCommentCount from '@/components/TwikooCommentCount'
import LazyImage from '@/components/LazyImage'
import { formatDateFmt } from '@/lib/formatDate'
// import Image from 'next/image'

const BlogPostCard = ({ index, post, showSummary, siteInfo }) => {
  const showPreview = siteConfig('HEXO_POST_LIST_PREVIEW', null, CONFIG) && post.blockMap
  // matery 主题默认强制显示图片
  if (post && !post.pageCoverThumbnail) {
    post.pageCoverThumbnail = siteInfo?.pageCover
  }
  const showPageCover = siteConfig('HEXO_POST_LIST_COVER', null, CONFIG) && post?.pageCoverThumbnail
  const delay = (index % 3) * 300
  return (
        <div
            data-aos="zoom-in"
            data-aos-duration="500"
            data-aos-delay={delay}
            data-aos-once="true"
            data-aos-anchor-placement="top-bottom"
            className="w-full mb-4 overflow-hidden shadow-md border dark:border-transparent rounded-xl bg-white dark:bg-sky-950">

            {/* 固定高度 ，空白用图片拉升填充 */}
            <div className="group flex flex-col h-full justify-between">

                {/* 头部图片 填充卡片 */}
                {showPageCover && (
                    <Link href={`${siteConfig('SUB_PATH', '')}/${post.slug}`} passHref legacyBehavior>
                        <div className="flex flex-grow w-full relative duration-200 = rounded-t-md cursor-pointer transform overflow-hidden">
                            <LazyImage
                                src={post?.pageCoverThumbnail}
                                alt={post.title}
                                className="h-full w-full group-hover:scale-125 group-hover:brightness-50 brightness-90 rounded-t-md transform object-cover duration-500 height-64"
                                style= {{ height: '177px' }}

                            />
                            <div className='absolute bottom-0 left-0 text-white p-6 text-2xl replace break-words w-full shadow-text'>{post.title}</div>
                        </div>
                    </Link>
                )}

                {/* 文字描述 */}
                <div >
                    {/* 描述 */}
                    <div className="px-4 flex flex-col w-full  text-gray-700  dark:text-gray-300">

                        {(!showPreview || showSummary) && post.summary && (
                            <p style={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: '4', WebkitBoxOrient: 'vertical' }}
                                className="replace my-2 text-sm font-light leading-7">
                                {post.summary}
                            </p>
                        )}

                        <div className='text-gray-800 justify-between flex my-2  dark:text-gray-300'>
                            <div>
                                <Link
                                    href={`/archive#${formatDateFmt(post?.publishDate, 'yyyy-MM')}`}
                                    passHref
                                    className="font-light hover:underline cursor-pointer text-sm leading-4 mr-3">

                                    <i className="far fa-clock mr-1" />
                                    {post.date?.start_date || post.lastEditedDay}

                                </Link>
                                <TwikooCommentCount post={post} className='hover:underline cursor-pointer text-sm'/>
                            </div>
                            <Link
                                href={`/category/${post.category}`}
                                passHref
                                className="cursor-pointer font-light text-sm hover:underline hover:text-indigo-700 dark:hover:text-indigo-400 transform">

                                <i className="mr-1 far fa-folder" />
                                {post.category}

                            </Link>
                        </div>
                    </div>

                    {post?.tagItems && post?.tagItems.length > 0 && (<>
                        <hr />
                        <div className="text-gray-400 justify-between flex px-5 py-3">
                            <div className="md:flex-nowrap flex-wrap md:justify-start inline-block">
                                <div>
                                    {' '}
                                    {post.tagItems.map(tag => (
                                        <TagItemMini key={tag.name} tag={tag} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </>)}
                </div>
            </div>

        </div>
  )
}

export default BlogPostCard
