import { varIs } from "common/var";
import { ReactComponent as HomeIcon } from "assets/icons/sidebar/home.svg";
import { ReactComponent as AirdropIcon } from "assets/icons/sidebar/airdrop.svg";
import { ReactComponent as CategoryIcon } from "assets/icons/sidebar/category.svg";
import { ReactComponent as ChartIcon } from "assets/icons/sidebar/chart.svg";
import { ReactComponent as CupIcon } from "assets/icons/sidebar/cup.svg";
import { ReactComponent as DocumentTextIcon } from "assets/icons/sidebar/document-text.svg";
import { ReactComponent as GlobalIcon } from "assets/icons/sidebar/global.svg";
import { ReactComponent as GroupIcon } from "assets/icons/sidebar/Group.svg";
import { ReactComponent as MessagesIcon } from "assets/icons/sidebar/messages.svg";
import { ReactComponent as PeopleIcon } from "assets/icons/sidebar/people.svg";
import { ReactComponent as ProfileCircleIcon } from "assets/icons/sidebar/profile-circle.svg";
import { ReactComponent as SettingIcon } from "assets/icons/sidebar/setting.svg";
import { ReactComponent as ShieldTickIcon } from "assets/icons/sidebar/shield-tick.svg";
import { ReactComponent as ShopIcon } from "assets/icons/sidebar/shop.svg";
import { ReactComponent as TeacherIcon } from "assets/icons/sidebar/teacher.svg";
import { ReactComponent as UserSquareIcon } from "assets/icons/sidebar/user-square.svg";
import { ReactComponent as AkashxIcon } from "assets/icons/sidebar/akashx.svg";
import { ReactComponent as HighLifeTravelIcon } from "assets/icons/sidebar/high-life-travel.svg";
export const menus = [
	{
		'label': 'Home',
		'route': '/',
		'icon': <HomeIcon />,		
		'taxOnly': false,
		'verificatonOnly': false,
		'userTypes': [1],
		'userStatuses': [1,3],
		'isMenuOnDesktop': true,
		'isMenuOnMobile': true,
	},
	{
		'label': 'Dashboard',
		'route': '/dashboard',
		'icon': <CategoryIcon />,		
		'taxOnly': false,
		'verificatonOnly': false,
		'userTypes': [1],
		'userStatuses': [1,3],
		'isMenuOnDesktop': true,
		'isMenuOnMobile': true,
	},
	{
		'label': 'My Account',
		'route': '/my_account',
		'icon': <ProfileCircleIcon />,		
		'taxOnly': false,
		'verificatonOnly': false,
		'userTypes': [1],
		'userStatuses': [1,3],
		'isMenuOnDesktop': true,
		'isMenuOnMobile': true,
		'submenus': [
			{
				'label': 'Subscriptions',
				'route': '/my_account/subscription',				
				'taxOnly': false,
				'verificatonOnly': false,
				'userTypes': [1],
				'userStatuses': [1,3],
				'isMenuOnDesktop': true,
				'isMenuOnMobile': true,
			},
			{
				'label': 'Order History',
				'route': '/my_account/order_history',
				'taxOnly': false,
				'verificatonOnly': false,
				'userTypes': [1],
				'userStatuses': [1,3],
				'isMenuOnDesktop': true,
				'isMenuOnMobile': true,
			},
			{
				'label': 'Order Receipt',
				'route': '/my_account/order_receipt',
				'taxOnly': false,
				'verificatonOnly': false,
				'userTypes': [1],
				'userStatuses': [1,3],
				'isMenuOnDesktop': false,
				'isMenuOnMobile': false,
			},
			{
				'label': 'Credit Wallet',
				'route': '/my_account/credit_wallet',
				'taxOnly': false,
				'verificatonOnly': false,
				'userTypes': [1],
				'userStatuses': [1,3],
				'isMenuOnDesktop': true,
				'isMenuOnMobile': true,
			},
			{
				'label': 'Gift Wallet',
				'route': '/my_account/gift_wallet',
				'taxOnly': false,
				'verificatonOnly': false,
				'userTypes': [1],
				'userStatuses': [1,3],
				'isMenuOnDesktop': true,
				'isMenuOnMobile': true,
			},
			{
				'label': 'Payment Options',
				'route': '/my_account/payment_option',				
				'taxOnly': false,
				'verificatonOnly': false,
				'userTypes': [1],
				'userStatuses': [1,3],
				'isMenuOnDesktop': true,
				'isMenuOnMobile': true,
			},
			{
				'label': 'Account Settings',
				'route': '/my_account/setting',				
				'taxOnly': false,
				'verificatonOnly': false,
				'userTypes': [1],
				'userStatuses': [1,3],
				'isMenuOnDesktop': true,
				'isMenuOnMobile': true,
			}
		]
	},
	{
		'label': 'My Team',
		'route': '/my_team',
		'icon': <PeopleIcon />,		
		'taxOnly': false,
		'verificatonOnly': false,
		'userTypes': [1],
		'userStatuses': [1,3],
		'isMenuOnDesktop': true,
		'isMenuOnMobile': true,
		'submenus': [
			{
				'label': 'Binary List',
				'route': '/my_team/binary_list',
				'taxOnly': false,
				'verificatonOnly': false,
				'userTypes': [1],
				'userStatuses': [1,3],
				'isMenuOnDesktop': true,
				'isMenuOnMobile': true,
			},
			{
				'label': 'Binary Tree',
				'route': '/my_team/binary_tree',				
				'taxOnly': false,
				'verificatonOnly': false,
				'userTypes': [1],
				'userStatuses': [1,3],
				'isMenuOnDesktop': true,
				'isMenuOnMobile': true,
			},
			{
				'label': 'Enroller List',
				'route': '/my_team/unilevel_list',				
				'taxOnly': false,
				'verificatonOnly': false,
				'userTypes': [1],
				'userStatuses': [1,3],
				'isMenuOnDesktop': true,
				'isMenuOnMobile': true,
			},
			{
				'label': 'Enroller Tree',
				'route': '/my_team/unilevel_tree',				
				'taxOnly': false,
				'verificatonOnly': false,
				'userTypes': [1],
				'userStatuses': [1,3],
				'isMenuOnDesktop': true,
				'isMenuOnMobile': true,
			},
			{
				'label': 'Holding Tank',
				'route': '/my_team/holding_tank',				
				'taxOnly': false,
				'verificatonOnly': false,
				'userTypes': [1],
				'userStatuses': [1,3],
				'isMenuOnDesktop': true,
				'isMenuOnMobile': true,
			},
			{
				'label': 'Upline Enrollers',
				'route': '/my_team/upline',				
				'taxOnly': false,
				'verificatonOnly': false,
				'userTypes': [1],
				'userStatuses': [1,3],
				'isMenuOnDesktop': true,
				'isMenuOnMobile': true,
			}
		]
	},
	{
		'label': 'Team Messenger Chat',
		'route': '/team_chat',
		'icon': <MessagesIcon />,		
		'taxOnly': false,
		'verificatonOnly': false,
		'userTypes': [1],
		'userStatuses': [1,3],
		'isMenuOnDesktop': true,
		'isMenuOnMobile': true,
	},
	{
		'label': 'My Website',
		'route': '/my_website',
		'icon': <GlobalIcon />,		
		'taxOnly': false,
		'verificatonOnly': false,
		'userTypes': [1],
		'userStatuses': [1,3],
		'isMenuOnDesktop': true,
		'isMenuOnMobile': true,
		'submenus': [
			{
				'label': 'Replicated Website',
				'route': '/my_website/replicated',				
				'taxOnly': false,
				'verificatonOnly': false,
				'userTypes': [1],
				'userStatuses': [1,3],
				'isMenuOnDesktop': true,
				'isMenuOnMobile': true,
			},
			{
				'label': 'Capture Pages',
				'route': '/my_website/capture',				
				'taxOnly': false,
				'verificatonOnly': false,
				'userTypes': [1],
				'userStatuses': [1,3],
				'isMenuOnDesktop': true,
				'isMenuOnMobile': true,
			},
			{
				'label': 'Sharable Carts',
				'route': '/my_website/share_cart',				
				'taxOnly': false,
				'verificatonOnly': false,
				'userTypes': [1],
				'userStatuses': [1,3],
				'isMenuOnDesktop': true,
				'isMenuOnMobile': true,
			}
		]
	},
	{
		'label': 'Live Stream',
		'route': '/live_stream',
		'icon': <AirdropIcon />,		
		'taxOnly': false,
		'verificatonOnly': false,
		'userTypes': [1],
		'userStatuses': [1,3],
		'isMenuOnDesktop': true,
		'isMenuOnMobile': true,
	},
	{
		'label': 'Publisher',
		'route': '/publisher',
		'icon': null,		
		'taxOnly': false,
		'verificatonOnly': false,
		'userTypes': [1],
		'userStatuses': [1,3],
		'isMenuOnDesktop': false,
		'isMenuOnMobile': false,
	},
	{
		'label': 'Notifications',
		'route': '/notifications',
		'icon': null,		
		'taxOnly': false,
		'verificatonOnly': false,
		'userTypes': [1],
		'userStatuses': [1,3],
		'isMenuOnDesktop': false,
		'isMenuOnMobile': false,
	},
	{
		'label': 'Checkout',
		'route': '/checkout',
		'icon': null,		
		'taxOnly': false,
		'verificatonOnly': false,
		'userTypes': [1],
		'userStatuses': [1,3],
		'isMenuOnDesktop': false,
		'isMenuOnMobile': false,
	},
	{
		'label': 'Viewer',
		'route': '/viewer',
		'icon': null,		
		'taxOnly': false,
		'verificatonOnly': false,
		'userTypes': [1],
		'userStatuses': [1,3],
		'isMenuOnDesktop': false,
		'isMenuOnMobile': false,
	},
	{
		'label': 'Training',
		'route': '/training',
		'icon': <TeacherIcon />,		
		'taxOnly': false,
		'verificatonOnly': false,
		'userTypes': [1],
		'userStatuses': [1,3],
		'isMenuOnDesktop': true,
		'isMenuOnMobile': true,
	},
	{
		'label': 'Contact Manager',
		'route': '/contact_manager',
		'icon': <UserSquareIcon />,		
		'taxOnly': false,
		'verificatonOnly': false,
		'userTypes': [1],
		'userStatuses': [1,3],
		'isMenuOnDesktop': true,
		'isMenuOnMobile': true,
	},
	{
		'label': 'Leaderboard',
		'route': '/leaderboard',
		'icon': <ChartIcon />,		
		'taxOnly': false,
		'verificatonOnly': false,
		'userTypes': [1],
		'userStatuses': [1,3],
		'isMenuOnDesktop': true,
		'isMenuOnMobile': true,
	},
	{
		'label': 'Earnings',
		'route': '/earning',
		'icon': <GroupIcon />,		
		'taxOnly': false,
		'verificatonOnly': false,
		'userTypes': [1],
		'userStatuses': [1,3],
		'isMenuOnDesktop': true,
		'isMenuOnMobile': true,
	},
	{
		'label': 'My Rank',
		'route': '/my_rank',
		'icon': <CupIcon />,		
		'taxOnly': false,
		'verificatonOnly': false,
		'userTypes': [1],
		'userStatuses': [1,3],
		'isMenuOnDesktop': true,
		'isMenuOnMobile': true,
		'submenus': [
			{
				'label': 'Rank Snapshot',
				'route': '/my_rank/rank_snapshot',
				'taxOnly': false,
				'verificatonOnly': false,
				'userTypes': [1],
				'userStatuses': [1,3],
				'isMenuOnDesktop': true,
				'isMenuOnMobile': true,
			},
			{
				'label': 'Rank Recognition',
				'route': '/my_rank/rank_recognition',
				'taxOnly': false,
				'verificatonOnly': false,
				'userTypes': [1],
				'userStatuses': [1,3],
				'isMenuOnDesktop': true,
				'isMenuOnMobile': true,
			}
		]
	},
	{
		'label': 'Tools',
		'route': '/tool',
		'icon': <SettingIcon />,	
		'taxOnly': false,
		'verificatonOnly': false,
		'userTypes': [1],
		'userStatuses': [1,3],
		'isMenuOnDesktop': true,
		'isMenuOnMobile': true,
		'submenus': [
			{
				'label': 'Marketing Assets',
				'route': '/tool/marketing_asset',
				'taxOnly': false,
				'verificatonOnly': false,
				'userTypes': [1],
				'userStatuses': [1,3],
				'isMenuOnDesktop': true,
				'isMenuOnMobile': true,
			},
			// {
			// 	'label': 'Leads and Traffic',
			// 	'route': '/tool/leads_and_traffic',
			// 	'taxOnly': false,
			// 	'verificatonOnly': false,
			// 	'userTypes': [1],
			// 	'userStatuses': [1,3],
			// 	'isMenuOnDesktop': true,
			// 	'isMenuOnMobile': true,
			// }
		]
	},
	{
		'label': 'Reports',
		'route': '/report',
		'icon': <DocumentTextIcon />,		
		'taxOnly': false,
		'verificatonOnly': false,
		'userTypes': [1],
		'userStatuses': [1,3],
		'isMenuOnDesktop': true,
		'isMenuOnMobile': true,
		'submenus': [
			{
				'label': 'Bonus Trackers',
				'route': '/report/bonus_tracker',				
				'taxOnly': false,
				'verificatonOnly': false,
				'userTypes': [1],
				'userStatuses': [1,3],
				'isMenuOnDesktop': true,
				'isMenuOnMobile': true,
			},
			{
				'label': 'Global Bonus Pool',
				'route': '/report/global_pool',				
				'taxOnly': false,
				'verificatonOnly': false,
				'userTypes': [1],
				'userStatuses': [1,3],
				'isMenuOnDesktop': true,
				'isMenuOnMobile': true,
			},
			// {
			// 	'label': 'Volume Report',
			// 	'route': '/report/volume_report',				
			// 	'taxOnly': false,
			// 	'verificatonOnly': false,
			// 	'userTypes': [1],
			// 	'userStatuses': [1,3],
			// 	'isMenuOnDesktop': true,
			// 	'isMenuOnMobile': true,
			// },
			{
				'label': 'Decline Report',
				'route': '/report/decline_report',				
				'taxOnly': false,
				'verificatonOnly': false,
				'userTypes': [1],
				'userStatuses': [1,3],
				'isMenuOnDesktop': true,
				'isMenuOnMobile': true,
			},
			// {
			// 	'label': 'Team Leaderboard',
			// 	'route': '/report/team_leaderboard',				
			// 	'taxOnly': false,
			// 	'verificatonOnly': false,
			// 	'userTypes': [1],
			// 	'userStatuses': [1,3],
			// 	'isMenuOnDesktop': true,
			// 	'isMenuOnMobile': true,
			// },
			{
				'label': 'Top Earners',
				'route': '/report/top_earner',				
				'taxOnly': false,
				'verificatonOnly': false,
				'userTypes': [1],
				'userStatuses': [1,3],
				'isMenuOnDesktop': true,
				'isMenuOnMobile': true,
			},
			{
				'label': 'Rank Report',
				'route': '/report/rank_report',				
				'taxOnly': false,
				'verificatonOnly': false,
				'userTypes': [1],
				'userStatuses': [1,3],
				'isMenuOnDesktop': true,
				'isMenuOnMobile': true,
			},
			{
				'label': 'Binary Qualification',
				'route': '/report/binary_qual',
				'taxOnly': false,
				'verificatonOnly': false,
				'userTypes': [1],
				'userStatuses': [1,3],
				'isMenuOnDesktop': true,
				'isMenuOnMobile': true,
			},
		]
	},
	{
		'label': 'Shop',
		'route': '/shop',
		'icon': <ShopIcon />,		
		'taxOnly': false,
		'verificatonOnly': false,
		'userTypes': [1],
		'userStatuses': [1,3],
		'isMenuOnDesktop': true,
		'isMenuOnMobile': true,
	},
	{
		'label': 'Akashx',
		'route': '/akashx/home',
		'icon': <AkashxIcon />,		
		'taxOnly': false,
		'verificatonOnly': false,
		'userTypes': [1],
		'userStatuses': [1,3],
		'isMenuOnDesktop': true,
		'isMenuOnMobile': true
	},
	{
		'label': 'Market Research Analysis',
		'route': '/akashx/market_research_analysis',
		'taxOnly': false,
		'verificatonOnly': false,
		'userTypes': [1],
		'userStatuses': [1,3],
		'isMenuOnDesktop': false,
		'isMenuOnMobile': false,
	},
	{
		'label': 'Market Research Videos',
		'route': '/akashx/market_research_videos',
		'taxOnly': false,
		'verificatonOnly': false,
		'userTypes': [1],
		'userStatuses': [1,3],
		'isMenuOnDesktop': false,
		'isMenuOnMobile': false,
	},
	{
		'label': 'Market Research News',
		'route': '/akashx/market_research_news',	
		'icon': '',			
		'taxOnly': false,
		'verificatonOnly': false,
		'userTypes': [1],
		'userStatuses': [1,3],
		'isMenuOnDesktop': false,
		'isMenuOnMobile': false,
	},
	{
		'label': 'Market Research Webinars',
		'route': '/akashx/market_research_webinars',	
		'icon': '',			
		'taxOnly': false,
		'verificatonOnly': false,
		'userTypes': [1],
		'userStatuses': [1,3],
		'isMenuOnDesktop': false,
		'isMenuOnMobile': false,
	},
	{
		'label': 'High Life Travel',
		'route': '/hlt',
		'icon': <HighLifeTravelIcon />,		
		'taxOnly': false,
		'verificatonOnly': false,
		'userTypes': [1],
		'userStatuses': [1,3],
		'isMenuOnDesktop': true,
		'isMenuOnMobile': true,
	},
	{
		'label': 'Support',
		'route': '/support',
		'icon': <ShieldTickIcon />,
		'taxOnly': false,
		'verificatonOnly': false,
		'userTypes': [1],
		'userStatuses': [1,3],
		'isMenuOnDesktop': true,
		'isMenuOnMobile': true,
	},
]

export const hasPageAccess = (pathname, myUser, sudoName) => {
	let isAble = true	
	let menu = null
	menus.forEach(menu0 => {
		if (menu0.route===pathname) {
			menu = menu0
		}
		if (menu0.submenus) {
			menu0.submenus.forEach(submenu0 => {
				if (submenu0.route===pathname) {
					menu = submenu0
				}
			})
		}
	})
	if (!menu) {
		return false
	}	
	if (menu.userTypes.indexOf(myUser.type*1)===-1) {
		isAble = false
	}
	if (menu.userStatuses?.indexOf(myUser.status)==-1) {
		isAble = false
	}
	if (menu.taxOnly && 
		!varIs('user.taxStatus', myUser.tax_status, 'requested')
	) {
		isAble = false
	}
	if (menu.verificationOnly && 
		!varIs('user.verificationStatus', myUser.verification_status, 'requested')
	) {
		isAble = false
	}

	return isAble
}

export const getPageTitle = (pathname) => {
	let pageTitle = null
	menus.forEach(menu0 => {
		if (menu0.route===pathname) {
			pageTitle = menu0.label
		}
		if (menu0.submenus) {
			menu0.submenus.forEach(submenu0 => {
				if (submenu0.route===pathname) {
					pageTitle = submenu0.label
				}
			})
		}
	})

	return pageTitle
}
